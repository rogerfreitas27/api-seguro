package com.equiplano.seguro.exception;

import java.util.HashMap;
import java.util.Map;
import javax.persistence.EntityNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.HttpStatus;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.WebRequest;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;

@RestControllerAdvice
public class ErrorExceptionHandler {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});
		return errors;
	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<Object> DataIntegrityViolationException(Exception ex, WebRequest request) {
		return new ResponseEntity<Object>("Violação de constraint,campos chave nulo ou existentes", new HttpHeaders(),
				HttpStatus.BAD_REQUEST);
	}

	// Aqui eu trato a chave estrangeira de cliente em apolice
	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<Object> EntityNotFoundException(Exception ex, WebRequest request) {
		return new ResponseEntity<Object>("Objeto não encontrado", new HttpHeaders(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(InvalidFormatException.class)
	public ResponseEntity<Object> InvalidFormatException(Exception ex, WebRequest request) {
		return new ResponseEntity<Object>("Falha ao converter campos", new HttpHeaders(), HttpStatus.BAD_REQUEST);
	}

}
