package com.equiplano.seguro.persistence;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import org.springframework.stereotype.Service;
import com.equiplano.seguro.model.Apolice;
import com.equiplano.seguro.repository.ApoliceRepository;

@Service
public class ApolicePersistence {
	private final ApoliceRepository ar;

	public ApolicePersistence(ApoliceRepository ar) {
		this.ar = ar;

	}

	public String salvar(Apolice a) {

		if (a.getId() == null) {
			a.setNumero(gerarNumero());
			return cadastrar(a);
		} else
			return alterar(a);
	}

	private String alterar(Apolice a) {
		ar.save(a);
		return a.getNumero();
	}

	private String cadastrar(Apolice a) {
		ar.save(a);
		return a.getNumero();
	}

	private String gerarNumero() {

		Random aleatorio = new Random();
		Long num = Math.abs(aleatorio.nextLong());
		return num.toString();
	}

	public boolean existeApolice(Long id) {
		return ar.existsById(id);
	}

	public void excluir(Long id) {
		ar.deleteById(id);
	}

	public int contadorApoliceCliente(Long id) {
		return ar.contadorApoliceCliente(id);
	}

	public Optional<Apolice> buscarPorId(Long id) {
		return ar.findById(id);
	}

	public Apolice buscarPorNumero(String numero) {
		return ar.findByNumero(numero);
	}

	public int existeApoliceNumero(String numero) {
		return ar.existeApoliceNumero(numero);
	}

	public List<Apolice> buscarTodos() {
		return ar.findAll();
	}

}
