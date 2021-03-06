package com.equiplano.seguro.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.br.CPF;

@Entity
@Table(name = "cliente")
public class Cliente implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "Campo obrigatório")
	@Size(min = 3, max = 255, message = "O campo nome tem no mínimo 3 caracteres" + "e no maximo 255 caracteres")
	private String nome;

	@NotBlank(message = "Campo obrigatório")
	@Size(min = 3, max = 60, message = "O campo cidade tem no mínimo 3 caracteres" + "e no maximo 60 caracteres")
	private String cidade;

	@NotBlank(message = "Campo obrigatório")
	@Size(min = 2, max = 2, message = "O campo uf tem no maximo 2 caracteres")
	private String uf;

	@Column(unique = true)
	@CPF(message = "CPF invalido")
	@NotBlank(message = "Campo CPF é obrigatório")
	private String cpf;

	public Cliente() {

	}

	public Cliente(Long id,
			@NotBlank(message = "Campo obrigatório") @Size(min = 3, max = 60, message = "O campo nome tem no mínimo 3 caracterese no maximo 255 caracteres") String nome,
			@NotBlank(message = "Campo obrigatório") @Size(min = 3, max = 60, message = "O campo cidade tem no mínimo 3 caracterese no maximo 255 caracteres") String cidade,
			@NotBlank(message = "Campo obrigatório") @Size(min = 3, max = 60, message = "O campo uf tem no maximo 2 caracteres") String uf,
			@CPF(message = "Campo invalido") String cpf) {

		this.id = id;
		this.nome = nome;
		this.cidade = cidade;
		this.uf = uf;
		this.cpf = cpf;
	}

	public Cliente(Long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "Cliente [id=" + id + ", nome=" + nome + ", cidade=" + cidade + ", uf=" + uf + ", cpf=" + cpf + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome.toUpperCase();
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade.toUpperCase();
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf.toUpperCase();
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(@CPF(message = "CPF invalido") @NotBlank(message = "Campo CPF é obrigatório") String cpf) {
		this.cpf = cpf;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Cliente other = (Cliente) obj;
		return Objects.equals(id, other.id);
	}

}
