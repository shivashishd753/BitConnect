"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Activity,
  AlertCircle,
  CheckCircle2,
  FileVideo,
  LoaderCircle,
  RotateCcw,
  Upload,
} from "lucide-react";
import {
  DrawingUtils,
  FilesetResolver,
  PoseLandmarker,
} from "@mediapipe/tasks-vision";

const WASM_URL =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.1.0/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task";
const MAX_VIDEO_SECONDS = 90;
const MAX_SAMPLES = 45;

function calculateAngle(a, b, c) {
  if (!a || !b || !c) return null;
  if ([a, b, c].some((point) => (point.visibility ?? 1) < 0.45)) {
    return null;
  }

  const radians = Math.atan2(c.y - b.y, c.x - b.x) -
    Math.atan2(a.y - b.y, a.x - b.x);
  let degrees = Math.abs((radians * 180) / Math.PI);
  if (degrees > 180) degrees = 360 - degrees;
  return Math.round(degrees);
}

function average(values) {
  const valid = values.filter(
    (value) => Number.isFinite(value) && value >= 0 && value <= 180
  );
  if (!valid.length) return null;
  return Math.round(valid.reduce((sum, value) => sum + value, 0) / valid.length);
}

function getFrameMetrics(landmarks) {
  if (!landmarks || landmarks.length < 29) return null;

  return {
    leftKnee: calculateAngle(landmarks[23], landmarks[25], landmarks[27]),
    rightKnee: calculateAngle(landmarks[24], landmarks[26], landmarks[28]),
    leftElbow: calculateAngle(landmarks[11], landmarks[13], landmarks[15]),
    rightElbow: calculateAngle(landmarks[12], landmarks[14], landmarks[16]),
    leftHip: calculateAngle(landmarks[11], landmarks[23], landmarks[25]),
    rightHip: calculateAngle(landmarks[12], landmarks[24], landmarks[26]),
  };
}

function summarizeFrames(frameMetrics) {
  const collect = (key) => average(frameMetrics.map((frame) => frame[key]));
  return {
    framesDetected: frameMetrics.length,
    leftKnee: collect("leftKnee"),
    rightKnee: collect("rightKnee"),
    leftElbow: collect("leftElbow"),
    rightElbow: collect("rightElbow"),
    leftHip: collect("leftHip"),
    rightHip: collect("rightHip"),
  };
}

function Metric({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-1 text-xl font-semibold text-emerald-300">
        {value == null ? "—" : `${value}°`}
      </p>
    </div>
  );
}

export default function CricketTechniqueLabPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const landmarkerRef = useRef(null);
  const fileUrlRef = useRef(null);

  const [videoUrl, setVideoUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [videoDuration, setVideoDuration] = useState(0);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [shotType, setShotType] = useState("batting");

  const loadModel = useCallback(async () => {
    if (landmarkerRef.current) return landmarkerRef.current;

    setNotice("Loading the on-device pose model…");
    const vision = await FilesetResolver.forVisionTasks(WASM_URL);
    const landmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: MODEL_URL,
        delegate: "CPU",
      },
      runningMode: "VIDEO",
      numPoses: 1,
      minPoseDetectionConfidence: 0.5,
      minPosePresenceConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    landmarkerRef.current = landmarker;
    return landmarker;
  }, []);

  useEffect(() => {
    return () => {
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
      if (landmarkerRef.current) landmarkerRef.current.close();
    };
  }, []);

  const clearOverlay = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const drawPose = useCallback((landmarks) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.videoWidth || !video.videoHeight) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (!landmarks) return;

    const drawing = new DrawingUtils(context);
    drawing.drawConnectors(landmarks, PoseLandmarker.POSE_CONNECTIONS, {
      color: "#34d399",
      lineWidth: 3,
    });
    drawing.drawLandmarks(landmarks, {
      color: "#fbbf24",
      lineWidth: 1,
      radius: 3,
    });
  }, []);

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setError("Choose a video file.");
      return;
    }

    if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
    const url = URL.createObjectURL(file);
    fileUrlRef.current = url;
    setVideoUrl(url);
    setFileName(file.name);
    setAnalysis(null);
    setError("");
    setNotice("");
    setProgress(0);
    clearOverlay();
  }

  function waitForSeek(video, targetTime) {
    return new Promise((resolve, reject) => {
      if (Math.abs(video.currentTime - targetTime) < 0.015) {
        requestAnimationFrame(resolve);
        return;
      }

      const timeout = window.setTimeout(() => {
        video.removeEventListener("seeked", onSeeked);
        reject(new Error("The browser could not seek to a video frame."));
      }, 5000);

      function onSeeked() {
        window.clearTimeout(timeout);
        resolve();
      }

      video.addEventListener("seeked", onSeeked, { once: true });
      video.currentTime = targetTime;
    });
  }

  async function analyzeVideo() {
    const video = videoRef.current;
    if (!video || !videoUrl || busy) return;

    setBusy(true);
    setError("");
    setAnalysis(null);
    setProgress(0);
    clearOverlay();
    video.pause();

    try {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) {
        throw new Error("Wait until the video has loaded, then try again.");
      }
      if (duration > MAX_VIDEO_SECONDS) {
        throw new Error(
          `For this prototype, choose a clip of ${MAX_VIDEO_SECONDS} seconds or less.`
        );
      }

      const landmarker = await loadModel();
      const sampleCount = Math.min(
        MAX_SAMPLES,
        Math.max(8, Math.ceil(duration * 1.5))
      );
      const collected = [];
      let lastLandmarks = null;

      setNotice("Scanning sampled frames in your browser…");
      for (let index = 0; index < sampleCount; index += 1) {
        const time = sampleCount === 1
          ? 0
          : (duration * index) / (sampleCount - 1);

        await waitForSeek(video, time);
        const result = landmarker.detectForVideo(video, performance.now());
        const landmarks = result.landmarks?.[0];

        if (landmarks) {
          const metrics = getFrameMetrics(landmarks);
          if (metrics) collected.push(metrics);
          lastLandmarks = landmarks;
        }

        setProgress(Math.round(((index + 1) / sampleCount) * 100));
      }

      drawPose(lastLandmarks);
      const summary = summarizeFrames(collected);
      setAnalysis({
        ...summary,
        shotType,
        sampleCount,
        duration: Math.round(duration * 10) / 10,
      });

      if (summary.framesDetected === 0) {
        setNotice("");
        setError(
          "No clear full-body pose was detected. Try a brighter, wider shot with the player visible from head to feet."
        );
      } else {
        setNotice(
          `Analysis complete. Pose detected in ${summary.framesDetected} sampled frames.`
        );
      }
    } catch (analysisError) {
      console.error("Cricket technique analysis failed:", analysisError);
      setError(
        analysisError?.message ||
          "Could not analyze this clip. Check your connection and try again."
      );
      setNotice("");
    } finally {
      setBusy(false);
    }
  }

  function resetAnalysis() {
    setAnalysis(null);
    setError("");
    setNotice("");
    setProgress(0);
    clearOverlay();
    if (videoRef.current) videoRef.current.currentTime = 0;
  }

  const metricsAvailable = analysis &&
    [analysis.leftKnee, analysis.rightKnee, analysis.leftElbow,
      analysis.rightElbow, analysis.leftHip, analysis.rightHip]
      .some((value) => value != null);

  return (
    <main className="min-h-screen bg-[#0b0c10] px-4 py-6 text-gray-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/cricket"
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-300"
        >
          <ArrowLeft size={16} />
          Back to Cricket
        </Link>

        <header className="mt-6 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <Activity size={14} />
              Open-source on-device ML
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Cricket Technique Lab
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              Upload a short practice clip to detect body landmarks and inspect
              selected joint angles. This is a prototype movement-visualization
              tool, not an automated professional coaching verdict.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#111217] px-4 py-3 text-sm text-gray-300">
            <p className="font-medium text-white">Video stays on your device</p>
            <p className="mt-1 text-xs text-gray-500">
              The selected video is processed locally in your browser.
            </p>
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
          <section className="min-w-0 rounded-2xl border border-white/10 bg-[#111217] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-semibold text-white">Practice video</h2>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-[#07130e] transition hover:bg-emerald-400">
                <Upload size={16} />
                Choose video
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { value: "batting", label: "Batting practice" },
                { value: "bowling", label: "Bowling action" },
                { value: "fielding", label: "Fielding movement" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setShotType(option.value)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                    shotType === option.value
                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                      : "border-white/10 text-gray-400 hover:bg-white/5"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black">
              {videoUrl ? (
                <div className="relative w-full">
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    controls
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={(event) => {
                      setVideoDuration(event.currentTarget.duration);
                    }}
                    onTimeUpdate={() => {
                      // The overlay shows the last analyzed frame. It is not
                      // presented as a real-time tracking overlay.
                    }}
                    className="block h-auto max-h-[65vh] w-full object-contain"
                  />
                  <canvas
                    ref={canvasRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                  />
                </div>
              ) : (
                <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
                  <FileVideo size={34} className="text-gray-600" />
                  <p className="mt-3 font-medium text-gray-200">
                    Select a practice clip
                  </p>
                  <p className="mt-1 max-w-sm text-sm text-gray-500">
                    Use a clear, well-lit video with one player visible from
                    head to feet. Clips must be {MAX_VIDEO_SECONDS} seconds or
                    shorter.
                  </p>
                </div>
              )}
            </div>

            {fileName && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                <span className="break-all">{fileName}</span>
                <span>
                  {videoDuration > 0
                    ? `${videoDuration.toFixed(1)} seconds`
                    : "Loading video…"}
                </span>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={analyzeVideo}
                disabled={!videoUrl || busy || !videoDuration}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-[#07130e] transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {busy ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  <Activity size={16} />
                )}
                {busy ? `Analyzing ${progress}%` : "Analyze movement"}
              </button>
              <button
                type="button"
                onClick={resetAnalysis}
                disabled={busy || (!analysis && !error && !notice)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 disabled:opacity-40"
              >
                <RotateCcw size={15} />
                Reset analysis
              </button>
            </div>

            {busy && (
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {notice && (
              <p role="status" className="mt-4 flex items-start gap-2 text-sm text-emerald-300">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
                <span>{notice}</span>
              </p>
            )}
            {error && (
              <p role="alert" className="mt-4 flex items-start gap-2 text-sm text-rose-300">
                <AlertCircle size={17} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-white/10 bg-[#111217] p-5">
              <h2 className="font-semibold text-white">Movement report</h2>
              <p className="mt-1 text-sm text-gray-500">
                Average visible joint angles across sampled frames.
              </p>

              {analysis ? (
                <>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Metric label="Left knee" value={analysis.leftKnee} />
                    <Metric label="Right knee" value={analysis.rightKnee} />
                    <Metric label="Left elbow" value={analysis.leftElbow} />
                    <Metric label="Right elbow" value={analysis.rightElbow} />
                    <Metric label="Left hip" value={analysis.leftHip} />
                    <Metric label="Right hip" value={analysis.rightHip} />
                  </div>
                  <div className="mt-4 rounded-xl bg-white/[0.03] p-3 text-sm text-gray-400">
                    <p>
                      <span className="text-gray-200">Activity selected:</span>{" "}
                      {analysis.shotType}
                    </p>
                    <p className="mt-1">
                      <span className="text-gray-200">Pose frames detected:</span>{" "}
                      {analysis.framesDetected} / {analysis.sampleCount}
                    </p>
                    <p className="mt-1">
                      <span className="text-gray-200">Clip duration:</span>{" "}
                      {analysis.duration}s
                    </p>
                  </div>
                  {!metricsAvailable && (
                    <p className="mt-3 text-xs text-amber-300">
                      The body was detected, but joint visibility was not clear
                      enough to calculate reliable angles.
                    </p>
                  )}
                </>
              ) : (
                <div className="mt-4 rounded-xl border border-dashed border-white/10 px-4 py-8 text-center">
                  <Activity size={28} className="mx-auto text-gray-600" />
                  <p className="mt-3 text-sm text-gray-400">
                    Your measured values will appear here after analysis.
                  </p>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-5">
              <h2 className="font-semibold text-amber-200">How to interpret this</h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-400">
                <li>• The overlay marks estimated body landmarks, not the bat or ball.</li>
                <li>• Joint angles are 2D estimates and can be inaccurate when a limb is hidden or the camera angle is poor.</li>
                <li>• Values summarize sampled frames; they do not prove that a technique is correct or safe.</li>
                <li>• For best results, record one player in good light with the full body in view.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-white/10 bg-[#111217] p-5">
              <h2 className="font-semibold text-white">Model information</h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Powered by MediaPipe Pose Landmarker, an open-source vision
                toolkit. The model estimates 33 body landmarks. Processing runs
                in this browser; the video is not sent to your Supabase project
                or to an AI chat API.
              </p>
              <a
                href="https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker/web_js"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm text-emerald-300 underline underline-offset-4 hover:text-emerald-200"
              >
                Read the model documentation
              </a>
            </section>
          </aside>
        </div>

        <footer className="mt-8 border-t border-white/10 pt-5 text-xs text-gray-600">
          BIT Connect · Cricket Technique Lab · Prototype
        </footer>
      </div>
    </main>
  );
}
