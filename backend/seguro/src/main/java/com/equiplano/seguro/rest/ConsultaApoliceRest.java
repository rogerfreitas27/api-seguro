package com.equiplano.seguro.rest;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.equiplano.seguro.dto.ApoliceDto;
import com.equiplano.seguro.model.Apolice;
import com.equiplano.seguro.model.Status;
import com.equiplano.seguro.persistence.ApolicePersistence;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/apolice/consulta")
public class ConsultaApoliceRest {
	@Autowired
	private ApolicePersistence ap;

	@GetMapping("{numero}")
	public ResponseEntity<?> buscarApolice(@PathVariable("numero") String numero) {
        
		try {
			
		// Se houve falha ao converter o numero enviado é inválido
		Long n = Long.parseLong(numero);
		int num = ap.existeApoliceNumero(numero);
		if (num==0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Numero de apolice inexistente");
		}

		Apolice a = new Apolice();
		a = ap.buscarPorNumero(numero);
		ApoliceDto dto = new ApoliceDto();
		dto = montarResposta(a);

		return ResponseEntity.status(HttpStatus.OK).body(dto);
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Formato inválido de numero, o "
					+ "numero deve ser sem caracteres especiais  e deve ser no maximo 9223372036854775807");
		}
		
	}

	public ApoliceDto montarResposta(Apolice a) {
		ApoliceDto dto = new ApoliceDto();

		// 1° Informar se a apolice venceu ou não
		LocalDate hoje = LocalDate.now();

		// se getFim() for anterior a hoje
		boolean resp = a.getFim().isBefore(hoje);

		// Calcula a diferença de dias entre as duas datas
		Long diferencaEmDias = ChronoUnit.DAYS.between(hoje, a.getFim());

		dto.setPlaca(a.getPlaca());
		dto.setValor(a.getValor());

		if (resp == true) {
			dto.setSituacao("Apolice venceu a " + Math.abs(diferencaEmDias) + " dias");
			dto.setStatus(Status.VENCIDA);
			return dto;
		} else if (a.getFim().equals(hoje)) {
			dto.setSituacao("Apolice vence hoje");
		} else
			dto.setSituacao("Apolice vence em " + diferencaEmDias + " dias");
		dto.setStatus(Status.VALIDA);
		return dto;

	}

}
