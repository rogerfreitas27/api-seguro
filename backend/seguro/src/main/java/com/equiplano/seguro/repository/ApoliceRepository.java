package com.equiplano.seguro.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import com.equiplano.seguro.model.Apolice;
import org.springframework.data.jpa.repository.Query;

public interface ApoliceRepository extends JpaRepository<Apolice,Long> {
	
	
	public Apolice findByNumero(String numero);
	
	
	
	@Query(value="SELECT COUNT(numero) FROM apolice where numero=:cod",nativeQuery=true)
	public int existeApoliceNumero(String cod);
	
	
	
	
	 @Query(value = "SELECT COUNT(cliente_id) from  apolice  where cliente_id=:id", nativeQuery = true)
	public int contadorApoliceCliente(Long id);

}
