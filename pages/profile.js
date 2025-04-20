import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useWeb3React } from '@web3-react/core';
import { formatAddress } from '../utils/web3';

export default function Profile() {
  const { account, library } = useWeb3React();
  const [userInfo, setUserInfo] = useState({
    name: '',
    role: '',
    organization: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (account) {
      // TODO: Load user information from contract or backend
      // This will be implemented after contract deployment
    }
  }, [account]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!account || !library) return;

    setLoading(true);
    try {
      // TODO: Update user information on contract or backend
      // This will be implemented after contract deployment
      setLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Profile
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* User Information */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              User Information
            </h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Wallet Address
                </label>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {formatAddress(account)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  className="input"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </label>
                <select
                  className="input"
                  value={userInfo.role}
                  onChange={(e) => setUserInfo({ ...userInfo, role: e.target.value })}
                >
                  <option value="">Select Role</option>
                  <option value="manufacturer">Manufacturer</option>
                  <option value="distributor">Distributor</option>
                  <option value="pharmacist">Pharmacist</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Organization
                </label>
                <input
                  type="text"
                  className="input"
                  value={userInfo.organization}
                  onChange={(e) => setUserInfo({ ...userInfo, organization: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  className="input"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>

          {/* Role Permissions */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Role Permissions
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Current Role: {userInfo.role || 'Not Set'}
                </h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      checked={userInfo.role === 'manufacturer'}
                      readOnly
                    />
                    <label className="ml-2 block text-sm text-gray-900 dark:text-white">
                      Create and manage drugs
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      checked={['distributor', 'pharmacist'].includes(userInfo.role)}
                      readOnly
                    />
                    <label className="ml-2 block text-sm text-gray-900 dark:text-white">
                      Transfer drugs
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      checked={['doctor', 'patient'].includes(userInfo.role)}
                      readOnly
                    />
                    <label className="ml-2 block text-sm text-gray-900 dark:text-white">
                      Access medical records
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      checked={userInfo.role === 'doctor'}
                      readOnly
                    />
                    <label className="ml-2 block text-sm text-gray-900 dark:text-white">
                      Create medical records
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 