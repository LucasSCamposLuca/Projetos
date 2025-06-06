package com.example.ChatbotAPI.Repository;

import com.example.ChatbotAPI.Model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface ChatRepository extends JpaRepository<Cliente, Long> {
    // Método para encontrar cliente pelo número de telefone
    Optional<Cliente> findByNumeroCliente(String numeroCliente);

    // Método para encontrar cliente pelo ID
    Optional<Cliente> findById(Long id);

    // Método para encontrar cliente pela mesagem
    Optional<Cliente> findByMensagem(String mensagem);

    //Método para retornar todos os clientes
    List<Cliente> findAll();
}