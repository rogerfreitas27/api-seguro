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
import com.equiplano.seguro.model.Cliente;
import com.equiplano.seguro.persistence.ApolicePersistence;
import com.equiplano.seguro.persistence.ClientePersistence;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/cliente")
public class ClienteRest {

	private final ClientePersistence cp;
	private final ApolicePersistence ap;

	public ClienteRest(ClientePersistence cp, ApolicePersistence ap) {
		this.cp = cp;
		this.ap = ap;
	}

	@PostMapping
	public ResponseEntity<String> cadastro(@Valid @RequestBody Cliente cliente) {
		cliente.setCpf(cliente.getCpf().replaceAll("[^0-9]+", ""));
		cp.salvar(cliente);
		return ResponseEntity.status(HttpStatus.CREATED).body("Cadastro realizado com sucesso !");
	}

	@GetMapping("/buscarPorCpf/{cpf}")
	public ResponseEntity<?> buscarPorCpf(@PathVariable("cpf") String cpf) {
		Cliente c = new Cliente();
		c.setCpf(cpf.replaceAll("[^0-9]+", ""));
		System.out.println("Cpf sem caracteres" + c.getCpf());

		return cp.buscarPorCpf(c).map(record -> ResponseEntity.ok().body(record))
				.orElse(ResponseEntity.notFound().build());
	}

	@PutMapping
	public ResponseEntity<String> alterar(@Valid @RequestBody Cliente cliente) {
		cp.salvar(cliente);
		return ResponseEntity.status(HttpStatus.OK).body("Alteração realizada com sucesso !");
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> buscarPorId(@PathVariable("id") Long id) {
		return cp.buscarPorId(id).map(record -> ResponseEntity.ok().body(record))
				.orElse(ResponseEntity.notFound().build());
	}

	@GetMapping
	public ResponseEntity<?> listar() {
		List<Cliente> clientes = new ArrayList<>();
		clientes = cp.buscarTodos();
		if (clientes.size() == 0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não há registros");
		}
		return ResponseEntity.status(HttpStatus.OK).body(clientes);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> excluir(@PathVariable("id") Long id) {

		boolean resp = cp.existeCliente(id);
		if (resp == false) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não existe !");
		}

		int num = ap.contadorApoliceCliente(id);

		if (num >= 1) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("Para excluir o cliente é " + "necessario excluir todas as apolices do mesmo !");
		}

		cp.excluir(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Exclusão realizada com sucesso !");

	}

}
