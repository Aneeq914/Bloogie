
const AccountEditProfile = () => {
  return (
    <main className="flex-1 bg-gray-50 px-6 py-10 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-1 text-2xl font-bold text-gray-900">
              Account Information
            </h2>
            <p className="mb-8 border-b border-gray-200 pb-6 text-sm text-gray-500">
              Manage your email and password.
            </p>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
            </div>

            <div className="mt-8 flex justify-end border-t border-gray-200 pt-6">
              <button className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">
                Save Changes
              </button>
            </div>
      </div>
    </main>
  )
}

export default AccountEditProfile
