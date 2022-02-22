package com.equiplano.seguro.dto;

import java.math.BigDecimal;

import com.equiplano.seguro.model.Status;

public class ApoliceDto {

	private Status status;
	private String situacao;
	private String placa;
	private BigDecimal valor;

	public ApoliceDto() {

	}

	public ApoliceDto(Status status, String situacao, String placa, BigDecimal valor) {

		this.status = status;
		this.situacao = situacao;
		this.placa = placa;
		this.valor = valor;
	}

	@Override
	public String toString() {
		return "ApoliceDto [status=" + status + ", situacao=" + situacao + ", placa=" + placa + ", valor=" + valor
				+ "]";
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public String getSituacao() {
		return situacao;
	}

	public void setSituacao(String situacao) {
		this.situacao = situacao;
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

}
