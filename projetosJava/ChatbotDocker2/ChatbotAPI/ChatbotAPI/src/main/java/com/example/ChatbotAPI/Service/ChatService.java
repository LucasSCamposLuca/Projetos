package com.example.ChatbotAPI.Service;

import com.example.ChatbotAPI.Model.Cliente;
import com.example.ChatbotAPI.Model.ClienteDTO;
import com.example.ChatbotAPI.Repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Value("${python.api.url}")
    private String pythonApiUrl; // URL base da PythonAPI definida no application.properties

    // Método para salvar um cliente no banco de dados
    public Cliente salvarCliente(Cliente cliente) {
        return chatRepository.save(cliente);
    }

    // Método para listar todos os clientes
    public List<Cliente> listarClientes() {
        return chatRepository.findAll();
    }

    // Método para buscar cliente por ID
    public Cliente buscarClientePorId(Long id) {
        return chatRepository.findById(id).orElse(null);
    }

    // Método para consultar cliente por número de telefone
    public Cliente consultarPorTelefone(String numeroCliente) {
        return chatRepository.findByNumeroCliente(numeroCliente).orElse(null);
    }

    // Método para atualizar ou salvar cliente
    public Cliente atualizarOuSalvarCliente(ClienteDTO clienteDTO) {
        Optional<Cliente> clienteExistente = chatRepository.findByMensagem(clienteDTO.getMensagem());

        if (clienteExistente.isPresent()) {
            Cliente cliente = clienteExistente.get();
            boolean atualizado = false;

            // Verifica e atualiza os campos necessários
            if (!cliente.getNomeCliente().equals(clienteDTO.getNomeCliente())) {
                cliente.setNomeCliente(clienteDTO.getNomeCliente());
                atualizado = true;
            }

            if (!cliente.getNumeroCliente().equals(clienteDTO.getNumeroCliente())) {
                cliente.setNumeroCliente(clienteDTO.getNumeroCliente());
                atualizado = true;
            }

            // Salva somente se houver alterações
            if (atualizado) {
                return chatRepository.save(cliente);
            }
            return cliente; // Retorna o cliente sem alterações
        } else {
            // Cria novo cliente
            Cliente novoCliente = new Cliente();
            novoCliente.setNomeCliente(clienteDTO.getNomeCliente());
            novoCliente.setNumeroCliente(clienteDTO.getNumeroCliente());
            novoCliente.setMensagem(clienteDTO.getMensagem());
            return chatRepository.save(novoCliente);
        }
    }

    // Método para consultar cliente por ID e retornar como DTO
    public ClienteDTO consultarPorId(Long id) {
        return chatRepository.findById(id)
                .map(cliente -> new ClienteDTO(cliente.getNomeCliente(), cliente.getNumeroCliente(), cliente.getMensagem()))
                .orElse(null);
    }

    // Método para deletar um cliente pelo ID
    public void deletarCliente(Long id) {
        chatRepository.deleteById(id);
    }

    // Método para enviar dados para a PythonAPI
    public String enviarParaPythonAPI(ClienteDTO clienteDTO) {
        RestTemplate restTemplate = new RestTemplate();
        try {
            String url = pythonApiUrl + "/enviar";
            return restTemplate.postForObject(url, clienteDTO, String.class);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao enviar dados para a PythonAPI: " + e.getMessage(), e);
        }
    }

    // Método para consultar informações da PythonAPI
    public ClienteDTO consultarParaPythonAPI(String tipoBusca, String valor) {
        RestTemplate restTemplate = new RestTemplate();
        try {
            String url = pythonApiUrl + "/consultar?tipoBusca=" + tipoBusca + "&valor=" + valor;
            return restTemplate.getForObject(url, ClienteDTO.class);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao consultar dados da PythonAPI: " + e.getMessage(), e);
        }
    }
}
