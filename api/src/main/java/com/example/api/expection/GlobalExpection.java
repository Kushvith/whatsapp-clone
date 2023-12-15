package com.example.api.expection;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class GlobalExpection {
    @ExceptionHandler(UserExpection.class)
    public ResponseEntity<ErrorDetail> userExpectionHandler(UserExpection e,WebRequest r){
        ErrorDetail err = new ErrorDetail(e.getMessage(),r.getDescription(false),LocalDateTime.now());
        return new ResponseEntity<ErrorDetail>(err,HttpStatus.BAD_REQUEST);
    }
     @ExceptionHandler(MessageException.class)
    public ResponseEntity<ErrorDetail> userExpectionHandler(MessageException e,WebRequest r){
        ErrorDetail err = new ErrorDetail(e.getMessage(),r.getDescription(false),LocalDateTime.now());
        return new ResponseEntity<ErrorDetail>(err,HttpStatus.BAD_REQUEST);
    }
        @ExceptionHandler(chatExpection.class)
    public ResponseEntity<ErrorDetail> chatExpectionHandler(MessageException e,WebRequest r){
        ErrorDetail err = new ErrorDetail(e.getMessage(),r.getDescription(false),LocalDateTime.now());
        return new ResponseEntity<ErrorDetail>(err,HttpStatus.BAD_REQUEST);
    }
    public ResponseEntity<ErrorDetail> methodArgumentNotValidExpectionHandler(MethodArgumentNotValidException ex,WebRequest r){
        ErrorDetail err = new ErrorDetail("Validation error",ex.getBindingResult().getFieldError().getDefaultMessage(),LocalDateTime.now());
        return new ResponseEntity<ErrorDetail>(err,HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorDetail> handleNoHandlerFoundExpection(NoHandlerFoundException ex,WebRequest r){
        ErrorDetail err = new ErrorDetail("end point not found",ex.getMessage(),LocalDateTime.now());
        return new ResponseEntity<ErrorDetail>(err,HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(Exception.class)
     public ResponseEntity<ErrorDetail> otherExpectionHandler(UserExpection e,WebRequest r){
        ErrorDetail err = new ErrorDetail(e.getMessage(),r.getDescription(false),LocalDateTime.now());
        return new ResponseEntity<ErrorDetail>(err,HttpStatus.BAD_REQUEST);
    }

}
