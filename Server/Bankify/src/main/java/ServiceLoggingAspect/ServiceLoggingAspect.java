package ServiceLoggingAspect;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ServiceLoggingAspect {

    // 🔹 Pointcut: All methods in com.bankify.services package
    @Pointcut("execution(* com.bankify.services.*.*(..))")
    public void serviceMethods() {}

    // 🔹 Before execution
    @Before("serviceMethods()")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("➡ Entering: " + joinPoint.getSignature());
    }

    // 🔹 After successful execution
    @AfterReturning("serviceMethods()")
    public void logAfterSuccess(JoinPoint joinPoint) {
        System.out.println("✔ Successfully executed: " + joinPoint.getSignature());
    }

    // 🔹 After exception
    @AfterThrowing(pointcut = "serviceMethods()", throwing = "ex")
    public void logAfterException(JoinPoint joinPoint, Throwable ex) {
        System.out.println("❌ Exception in: " + joinPoint.getSignature());
        System.out.println("   Reason: " + ex.getMessage());
    }
}
