package com.equiplano.seguro.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.equiplano.seguro.model.Cliente;
import com.equiplano.seguro.repository.ClienteRepository;

@Service
public class ClientePersistence {
	private final ClienteRepository cr;

	public ClientePersistence(ClienteRepository cr) {
		this.cr = cr;

	}

	public void salvar(Cliente c) {
		cr.save(c);
	}

	public void excluir(Long id) {

		cr.deleteById(id);
	}

	public Optional<Cliente> buscarPorCpf(Cliente c) {
		return cr.findByCpf(c.getCpf());
	}

	public List<Cliente> buscarTodos() {
		return cr.findAll();
	}

	public boolean existeCliente(Long id) {

		return cr.existsById(id);

	}

	public Optional<Cliente> buscarPorId(Long id) {
		return cr.findById(id);
	}

}
