package com.example.ChatbotAPI.Controllers;

import com.example.ChatbotAPI.Model.Cliente;
import com.example.ChatbotAPI.Model.ClienteDTO;
import com.example.ChatbotAPI.Service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

//import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clientes")
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    @Autowired
    private ChatService chatService;

    // Criar novo cliente
    @PostMapping
    public ResponseEntity<Cliente> criarCliente(@RequestBody ClienteDTO clienteDTO) {
        logger.info("Recebendo solicitação para criar cliente: {}", clienteDTO);
        Cliente cliente = new Cliente();
        cliente.setNomeCliente(clienteDTO.getNomeCliente());
        cliente.setNumeroCliente(clienteDTO.getNumeroCliente());
        cliente.setMensagem(clienteDTO.getMensagem());
        Cliente clienteSalvo = chatService.salvarCliente(cliente);
        return ResponseEntity.ok(clienteSalvo);
    }

    // Lista todos os clientes registrados
    @GetMapping("/listar")
    public ResponseEntity<?> listarClientes() {
        List<Cliente> clientes = chatService.listarClientes();
        if (clientes == null || clientes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não há clientes registrados");
        }
        return ResponseEntity.ok(clientes);
    }

    // Buscar cliente por ID
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarClientePorId(@PathVariable Long id) {
        logger.info("Buscando cliente por ID: {}", id);
        Cliente cliente = chatService.buscarClientePorId(id);
        return cliente != null ? ResponseEntity.ok(cliente) : ResponseEntity.notFound().build();
    }

    // Buscar por numero de telefone
    @GetMapping("/telefone")
    public ResponseEntity<Cliente> listarClientePorNumero(@RequestParam(name = "numeroCliente", required = false) String numeroCliente) {
        if (numeroCliente == null || numeroCliente.isEmpty()) {
            return ResponseEntity.badRequest().body(null);  // Retorna 400 se o parâmetro estiver ausente
        }

        // Aqui você pode optar por limpar a formatação do número antes de fazer a consulta
       // Remove todos os caracteres não numéricos

        Cliente cliente = chatService.consultarPorTelefone(numeroCliente);
        if (cliente != null) {
            return ResponseEntity.ok(cliente);  // Retorna o cliente se encontrado
        }
        return ResponseEntity.notFound().build();  // Retorna 404 se não encontrar
    }

    // Atualizar ou salvar cliente
    @PostMapping("/atualizar")
    public ResponseEntity<Cliente> atualizarOuSalvarCliente(@RequestBody ClienteDTO clienteDTO) {
        logger.info("Atualizando ou salvando cliente: {}", clienteDTO);
        Cliente cliente = chatService.atualizarOuSalvarCliente(clienteDTO);
        return ResponseEntity.ok(cliente);
    }


    // Deletar cliente por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCliente(@PathVariable Long id) {
        logger.info("Deletando cliente com ID: {}", id);
        chatService.deletarCliente(id);
        return ResponseEntity.noContent().build();
    }

    // Enviar dados para PythonAPI
    @PostMapping("/enviar")
    public ResponseEntity<String> enviarParaPythonAPI(@RequestBody ClienteDTO clienteDTO) {
        logger.info("Enviando dados para PythonAPI: {}", clienteDTO);
        try {
            String resposta = chatService.enviarParaPythonAPI(clienteDTO);
            return ResponseEntity.ok(resposta);
        } catch (Exception e) {
            logger.error("Erro ao enviar dados para PythonAPI", e);
            return ResponseEntity.status(500).body("Erro ao enviar dados para a PythonAPI");
        }
    }
}
