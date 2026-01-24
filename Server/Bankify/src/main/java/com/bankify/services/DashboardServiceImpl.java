package com.bankify.services;

import org.springframework.stereotype.Service;

import com.bankify.dto.DashboardStatsDTO;
import com.bankify.repository.DashboardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final DashboardRepository dashboardRepository;

    @Override
    public DashboardStatsDTO getDashboardStats() {
        return new DashboardStatsDTO(
            dashboardRepository.getTotalAccounts(),
            dashboardRepository.getTodayTransactions(),
            dashboardRepository.getTotalRevenue()
        );
    }
}
