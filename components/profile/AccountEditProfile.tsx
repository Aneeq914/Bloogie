
const AccountEditProfile = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 px-4 py-10 sm:px-6 lg:px-8 scrollbar-hidden">
      <div className="mx-auto max-w-2xl p-8 card">
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
                className="input"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input"
              />
            </div>

            <div className="mt-8 flex justify-end border-t border-gray-200 pt-6">
              <button className="btn-primary">
                Save Changes
              </button>
            </div>
      </div>
    </main>
  )
}

export default AccountEditProfile
