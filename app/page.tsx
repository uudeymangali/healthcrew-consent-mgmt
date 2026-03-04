export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to HealthCrew AI Marketplace
      </h1>
      <p className="text-gray-700 mb-6 text-center max-w-xl">
        Join the HealthCrew AI platform to connect with professionals, manage consent,
        and enrich contact data. Simple, secure, and GDPR compliant.
      </p>
      <a
        href="/consent/sample-token"
        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg"
      >
        Join Now
      </a>
    </div>
  );
}
