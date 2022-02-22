package com.equiplano.seguro.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.equiplano.seguro.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente,Long> {
	
	public Optional <Cliente> findByCpf(String cpf);

}
