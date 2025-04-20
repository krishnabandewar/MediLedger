import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useWeb3React } from '@web3-react/core';
import { getContract } from '../utils/web3';
import { formatAddress } from '../utils/web3';

export default function Dashboard() {
  const { account, library } = useWeb3React();
  const [drugStats, setDrugStats] = useState({
    total: 0,
    active: 0,
    transferred: 0,
  });
  const [recordStats, setRecordStats] = useState({
    total: 0,
    accessible: 0,
    pending: 0,
  });

  useEffect(() => {
    if (account && library) {
      // TODO: Load contract instances and fetch stats
      // This will be implemented after contract deployment
    }
  }, [account, library]);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Connected as: {formatAddress(account)}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Drug Statistics */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Drug Statistics
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total Drugs</span>
                <span className="font-medium">{drugStats.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Active Drugs</span>
                <span className="font-medium">{drugStats.active}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Transferred Drugs</span>
                <span className="font-medium">{drugStats.transferred}</span>
              </div>
            </div>
          </div>

          {/* Record Statistics */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Record Statistics
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total Records</span>
                <span className="font-medium">{recordStats.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Accessible Records</span>
                <span className="font-medium">{recordStats.accessible}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Pending Requests</span>
                <span className="font-medium">{recordStats.pending}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-4">
              <button className="w-full btn btn-primary">
                Create New Drug
              </button>
              <button className="w-full btn btn-secondary">
                Upload Medical Record
              </button>
              <button className="w-full btn btn-secondary">
                View Pending Requests
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {/* Activity items will be dynamically rendered here */}
            <div className="text-center text-gray-500 dark:text-gray-400">
              No recent activity
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 