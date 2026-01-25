package com.bankify.aspects;

import java.time.LocalDateTime;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Aspect
@Component
@Slf4j
public class ManagerLoggingAspect {

    @Before("execution(* com.bankify.controller..*(..))")
    public void logEveryRequest(JoinPoint jp) {
        log.info("REQUEST | TS={} | {}",
                LocalDateTime.now(),
                jp.getSignature().toShortString());
    }
}

/*
 //

    @Before("execution(* com.bankify.controller.ManagerController.verifyCustomer(..))")
    public void logVerifyCustomerController(JoinPoint jp) {
        log.info("MANAGER ACTION | VERIFY CUSTOMER | TS={} | Method={}",
                LocalDateTime.now(),
                jp.getSignature().toShortString());
    }

    @Before("execution(* com.bankify.controller.ManagerController.verifyAddress(..))")
    public void logVerifyAddressController(JoinPoint jp) {
        log.info("MANAGER ACTION | VERIFY ADDRESS | TS={} | Method={}",
                LocalDateTime.now(),
                jp.getSignature().toShortString());
    }

    @Before("execution(* com.bankify.controller.ManagerController.approve(..))")
    public void logApproveCustomerController(JoinPoint jp) {
        log.info("MANAGER ACTION | APPROVE CUSTOMER | TS={} | Method={}",
                LocalDateTime.now(),
                jp.getSignature().toShortString());
    }

    @Before("execution(* com.bankify.controller.ManagerController.reject(..))")
    public void logRejectCustomerController(JoinPoint jp) {
        log.info("MANAGER ACTION | REJECT CUSTOMER | TS={} | Method={}",
                LocalDateTime.now(),
                jp.getSignature().toShortString());
    }

    // 

    @Before("execution(* com.bankify.service.ManagerServiceImpl.verifyCustomer(..))")
    public void logVerifyCustomerService(JoinPoint jp) {
        log.info("BUSINESS ACTION | VERIFY CUSTOMER | Method={}",
                jp.getSignature().toShortString());
    }

    @Before("execution(* com.bankify.service.ManagerServiceImpl.verifyAddress(..))")
    public void logVerifyAddressService(JoinPoint jp) {
        log.info("BUSINESS ACTION | VERIFY ADDRESS | Method={}",
                jp.getSignature().toShortString());
    }

    @Before("execution(* com.bankify.service.ManagerServiceImpl.approveCustomer(..))")
    public void logApproveCustomerService(JoinPoint jp) {
        log.info("BUSINESS ACTION | APPROVE CUSTOMER | Method={}",
                jp.getSignature().toShortString());
    }

    @Before("execution(* com.bankify.service.ManagerServiceImpl.rejectCustomer(..))")
    public void logRejectCustomerService(JoinPoint jp) {
        log.info("BUSINESS ACTION | REJECT CUSTOMER | Method={}",
                jp.getSignature().toShortString());
    }
  */
 