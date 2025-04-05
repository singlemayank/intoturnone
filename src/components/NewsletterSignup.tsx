export default function NewsletterSignup() {
    return (
      <div className="max-w-xl mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-2">Get Paddock Briefings in Your Inbox</h2>
        <p className="text-gray-400 mb-6">Join 10,000+ fans receiving weekly updates, race previews, and strategy deep-dives.</p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Your email address"
            className="px-4 py-3 rounded-lg text-black focus:outline-none w-full sm:w-auto"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    );
  }
  