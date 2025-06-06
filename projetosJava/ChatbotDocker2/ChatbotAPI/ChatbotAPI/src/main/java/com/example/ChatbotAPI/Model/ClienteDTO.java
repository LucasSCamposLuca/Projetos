package com.example.ChatbotAPI.Model;

//import lombok.Data;
//
//@Data
public class ClienteDTO {
    private String nomeCliente;
    private String numeroCliente;
    private String mensagem;

    // Construtor padrão (obrigatório para desserialização)
    public ClienteDTO() {
    }

    public ClienteDTO(String nomeCliente, String numeroCliente, String mensagem) {
        this.nomeCliente = nomeCliente;
        this.numeroCliente = numeroCliente;
        this.mensagem = mensagem;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public String getNumeroCliente() {
        return numeroCliente;
    }

    public void setNumeroCliente(String numeroCliente) {
        this.numeroCliente = numeroCliente;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
}

