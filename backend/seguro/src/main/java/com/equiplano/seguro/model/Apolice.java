package com.equiplano.seguro.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Future;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "apolice")
public class Apolice implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true)
	private String numero;

	@NotNull(message = "Data de inicio é obrigatório ")
	@FutureOrPresent
	@Column(columnDefinition = "DATE")
	private LocalDate inicio;

	@NotNull(message = "Data final é obrigatória")
	@Future
	@Column(columnDefinition = "DATE")
	private LocalDate fim;

	@NotBlank(message = "Campo obrigatório")
	@Size(min = 7, max = 8, message = "O campo placa tem no miniimo 7 caracteres" + "e no maximo 8 caracteres")
	private String placa;

	@NotNull
	@DecimalMin(value = "0.99", inclusive = false, message = "Valor minimo 0.99")
	@DecimalMax(value = "999999.99", inclusive = true, message = "Valor maximo 999.999.99")
	@Digits(integer = 6, fraction = 2)
	private BigDecimal valor;

	@NotNull(message = "Id não pode ser nulo")
	@ManyToOne
	@JoinColumn(name = "cliente_id")
	private Cliente cliente;

	public Apolice() {

	}

	public Apolice(Long id, String numero, @FutureOrPresent LocalDate inicio, @Future LocalDate fim,
			@NotBlank(message = "Campo obrigatório") @Size(min = 7, max = 8, message = "O campo placa tem no miniimo 7 caracteres"
					+ "e no maximo 8 caracteres") String placa,

			@DecimalMin(value = "0.99", inclusive = false, message = "Valor minimo 0.99") @DecimalMax(value = "999999.99", inclusive = true, message = "Valor maximo 999.999.99") @Digits(integer = 6, fraction = 2) BigDecimal valor,
			@NotBlank(message = "Campo obrigatório") Cliente cliente) {

		this.id = id;
		this.numero = numero;
		this.inicio = inicio;
		this.fim = fim;
		this.placa = placa;
		this.valor = valor;
		this.cliente = cliente;
	}

	@Override
	public String toString() {
		return "Apolice [id=" + id + ", numero=" + numero + ", inicio=" + inicio + ", fim=" + fim + ", placa=" + placa
				+ ", valor=" + valor + ", cliente=" + cliente + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public LocalDate getInicio() {
		return inicio;
	}

	public void setInicio(LocalDate inicio) {
		this.inicio = inicio;
	}

	public LocalDate getFim() {
		return fim;
	}

	public void setFim(LocalDate fim) {
		this.fim = fim;
	}

	public String getPlaca() {
		return placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}

	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
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
		Apolice other = (Apolice) obj;
		return Objects.equals(id, other.id);
	}

}
