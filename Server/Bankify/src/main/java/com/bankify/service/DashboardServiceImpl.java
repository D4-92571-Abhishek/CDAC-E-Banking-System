package com.bankify.service;

import org.springframework.stereotype.Service;

import com.bankify.dto.DashboardStatsDTO;
import com.bankify.repository.ManagerDashboardRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class DashboardServiceImpl implements DashboardService {

    private final ManagerDashboardRepository dashboardRepository;

    @Override
    public DashboardStatsDTO getDashboardStats() {
        return new DashboardStatsDTO(
            dashboardRepository.getTotalAccounts(),
            dashboardRepository.getTodayTransactions(),
            dashboardRepository.getTotalRevenue()
        );
    }
}
