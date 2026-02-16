
import React, { useState, useCallback } from 'react';
import { getAuthenticityScore } from '../services/geminiService';
import { AuthenticityScoreResponse } from '../types';

const AuthenticityChecker: React.FC = () => {
  const [videoDescription, setVideoDescription] = useState<string>('');
  const [scoreResponse, setScoreResponse] = useState<AuthenticityScoreResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScore = useCallback(async () => {
    if (!videoDescription.trim()) {
      setError("Please enter a video or channel description.");
      return;
    }

    setLoading(true);
    setError(null);
    setScoreResponse(null);

    try {
      const response = await getAuthenticityScore(videoDescription);
      setScoreResponse(response);
    } catch (err) {
      setError((err as Error).message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, [videoDescription]); // Recreate only if videoDescription changes

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      fetchScore();
    }
  }, [fetchScore, loading]);

  const getScoreColor = (score: number | undefined) => {
    if (score === undefined || score === null) return 'text-gray-400';
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const scoreClass = getScoreColor(scoreResponse?.score);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main Content Area (simulated video player and input) */}
      <div className="flex-grow max-w-3xl">
        {/* Simulated Video Player */}
        <div className="w-full aspect-video bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center mb-6 shadow-lg">
          {scoreResponse ? (
            <div className="text-center p-4">
              <p className="text-lg text-gray-300 mb-2">Authenticity Score for:</p>
              <h2 className="text-2xl font-bold text-white mb-4 line-clamp-2">{videoDescription}</h2>
              <div className="flex flex-col items-center">
                <p className="text-4xl font-extrabold" style={{ color: scoreClass.split('-')[1] }}>
                  {scoreResponse.score !== undefined ? scoreResponse.score : '--'}
                  <span className="text-xl">%</span>
                </p>
                <p className={`mt-2 text-sm italic ${scoreClass}`}>
                  {scoreResponse.score !== undefined && scoreResponse.score >= 80 && "Highly Trustworthy"}
                  {scoreResponse.score !== undefined && scoreResponse.score >= 50 && scoreResponse.score < 80 && "Moderately Trustworthy"}
                  {scoreResponse.score !== undefined && scoreResponse.score < 50 && "Needs Caution"}
                </p>
              </div>
            </div>
          ) : (
            <img 
              src="https://picsum.photos/1280/720" 
              alt="Placeholder Video Thumbnail" 
              className="w-full h-full object-cover" 
            />
          )}
        </div>

        {/* Video Title/Description */}
        <h1 className="text-xl md:text-2xl font-bold mb-4">
          Authenticity Checker for YouTube Content
        </h1>
        <p className="text-gray-400 mb-6">
          Enter a description of a YouTube video or channel below to get an AI-powered authenticity score.
          This tool helps you evaluate the trustworthiness and credibility of content.
        </p>

        {/* Input and Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            className="flex-grow p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 'A video explaining quantum physics with simple animations' or 'A channel reviewing tech gadgets'"
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            onClick={fetchScore}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Get Authenticity Score'}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900 bg-opacity-30 border border-red-700 text-red-300 p-3 rounded-md mb-6">
            Error: {error}
          </div>
        )}
      </div>

      {/* Sidebar/Info Panel */}
      <div className="w-full lg:w-96 p-6 bg-gray-800 rounded-lg shadow-lg flex-shrink-0">
        <h2 className="text-xl font-semibold mb-4 text-white">Authenticity Insights</h2>
        {scoreResponse && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-200 mb-2">Score Justification:</h3>
            <p className="text-gray-300 whitespace-pre-wrap">{scoreResponse.justification}</p>
          </div>
        )}
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-200 mb-2">How it works:</h3>
          <p className="text-gray-300">
            Our AI analyzes various authenticity signals, including potential for clickbait, sensationalism,
            factual claims, and the implied intent of the content based on your description. It then provides a score
            and a justification for its assessment.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-200 mb-2">Tips for Viewers:</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Check the source (channel reputation).</li>
            <li>Look for supporting evidence for claims.</li>
            <li>Be wary of overly emotional or extreme language.</li>
            <li>Consider potential biases.</li>
            <li>Verify information with multiple reputable sources.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthenticityChecker;
