package com.equiplano.seguro.rest;

import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.equiplano.seguro.model.Apolice;
import com.equiplano.seguro.persistence.ApolicePersistence;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/apolice")
public class ApoliceRest {

	private final ApolicePersistence ap;

	public ApoliceRest(ApolicePersistence ap) {
		this.ap = ap;
	}

	@PostMapping
	public ResponseEntity<String> cadastro(@Valid @RequestBody Apolice apolice) {
		if (apolice.getFim().isBefore(apolice.getInicio())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Data final menor que data inicial");
		}

		String num = ap.salvar(apolice);
		return ResponseEntity.status(HttpStatus.CREATED).body(" Apolice de numero  " + num + " criada com sucesso !");
	}

	@PutMapping
	public ResponseEntity<String> alterar(@Valid @RequestBody Apolice apolice) {

		if (apolice.getFim().isBefore(apolice.getInicio())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Data final menor que data inicial");
		}

		if (apolice.getId() == null || apolice.getNumero() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Campo id ou numero da aplice vazio !");
		}
		String num = ap.salvar(apolice);
		return ResponseEntity.status(HttpStatus.OK).body("Alteração na Apolice " + num + " realizada com sucesso !");
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> buscarPorId(@PathVariable("id") Long id) {
		return ap.buscarPorId(id).map(record -> ResponseEntity.ok().body(record))
				.orElse(ResponseEntity.notFound().build());
	}

	@GetMapping
	public ResponseEntity<?> listar() {
		List<Apolice> apolices = new ArrayList<>();
		apolices = ap.buscarTodos();

		if (apolices.size() == 0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não há registros !");
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(apolices);

	}

	@DeleteMapping("/{cod}")
	public ResponseEntity<String> excluir(@PathVariable("cod") Long cod) {

		boolean resp = ap.existeApolice(cod);
		if (resp == true) {
			ap.excluir(cod);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Exclusão realizada com sucesso !");
		} else
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Id da Apolice inválido, não foi " + "possível realizara a exclusão ! ");
	}

}
