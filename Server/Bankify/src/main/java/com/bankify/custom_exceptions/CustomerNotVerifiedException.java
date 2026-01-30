//package com.bankify.custom_exceptions;
//
//public class CustomerNotVerifiedException {
//
//}
package com.bankify.custom_exceptions;

public class CustomerNotVerifiedException extends RuntimeException {
    public CustomerNotVerifiedException(String message) {
        super(message);
    }
}
