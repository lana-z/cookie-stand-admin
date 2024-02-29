import Link from "next/link";

export default function Overview() {
  return (
    <div>
      <h2 className="p-4 mb-4 text-4xl bg-green-500">Overview of the Cookie Stand</h2>
      <p className="mb-4">
        The Cookie Stand is not just about selling cookies; the cookies are specifically designed to give software developers an energy boost.
      </p>
      <p>
        Each cookie sold represents our commitment to tech. Experience the joy of cookies made with care.
      </p>
      <div className="mt-6">
        <Link href="/" legacyBehavior>
          <a className="inline-block px-5 py-2 transition-colors bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50">
            Go back to Home
          </a>
        </Link>
      </div>
    </div>
  );
}
