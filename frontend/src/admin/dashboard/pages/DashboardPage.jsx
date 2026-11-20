import { useEffect, useState, useCallback } from 'react';
import {
  getLocalEnquiries,
  computeDashboardData,
  fetchDashboardOverview,
  updateEnquiryStatus,
} from '../../../services/dashboardService';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSummaryCards from '../components/DashboardSummaryCards';
import DashboardStatusBreakdown from '../components/DashboardStatusBreakdown';
import RecentEnquiriesTable from '../components/RecentEnquiriesTable';
import UpcomingEventsList from '../components/UpcomingEventsList';
import DashboardQuickActions from '../components/DashboardQuickActions';
import EnquiryDetailModal from '../components/EnquiryDetailModal';

function getInitialDashboardData() {
  const localList = getLocalEnquiries();
  return computeDashboardData(localList);
}

export default function DashboardPage() {
  const [data, setData] = useState(getInitialDashboardData);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    document.title = 'Dashboard | Aditi Caterers Admin';
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const refreshedData = await fetchDashboardOverview();
      setData(refreshedData);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleStatusUpdated = async (enquiryNumber, newStatus, notes) => {
    await updateEnquiryStatus(enquiryNumber, newStatus, notes);
    // Reload updated dashboard stats
    const updatedData = await fetchDashboardOverview();
    setData(updatedData);
  };

  return (
    <div>
      {/* Header with Title, Welcome, and Refresh Button */}
      <DashboardHeader onRefresh={handleRefresh} refreshing={refreshing} />

      {/* Summary Cards (Total, New, Contacted, Quotations, Confirmed, Upcoming) */}
      <DashboardSummaryCards summary={data.summary} />

      {/* Enquiry Status Distribution Progress & Pills */}
      <DashboardStatusBreakdown
        breakdown={data.statusBreakdown}
        total={data.summary?.totalEnquiries || 0}
      />

      {/* Upcoming Confirmed Events */}
      <UpcomingEventsList
        events={data.upcomingEventsList}
        onViewDetails={(ev) => setSelectedEnquiry(ev)}
      />

      {/* Recent Enquiries Table */}
      <RecentEnquiriesTable
        enquiries={data.recentEnquiries}
        onViewDetails={(enq) => setSelectedEnquiry(enq)}
      />

      {/* Quick Action Shortcuts */}
      <DashboardQuickActions />

      {/* Enquiry Detail & Status Workflow Modal */}
      {selectedEnquiry && (
        <EnquiryDetailModal
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          onStatusUpdated={handleStatusUpdated}
        />
      )}
    </div>
  );
}
