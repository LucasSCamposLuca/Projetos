package com.example.demo.Controllers;

import com.example.demo.Models.Usuario;
import com.example.demo.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Método GET para mostrar o formulário de cadastro
    @GetMapping("/cadastrarUsuario")
    public String formUsuario(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "Usuario/formUsuario"; // O caminho do seu formulário
    }

    // Método POST para processar o cadastro
    @PostMapping("/cadastrarUsuario")
    public String cadastrarUsuario(@Validated Usuario usuario, BindingResult result, RedirectAttributes attributes) {
        if (result.hasErrors()) {
            attributes.addFlashAttribute("mensagem", "Verifique os campos!");
            return "redirect:/cadastrarUsuario";
        }

        // Aqui você pode adicionar lógica para verificar se o login já existe
        if (usuarioRepository.findByLogin(usuario.getLogin()) != null) {
            attributes.addFlashAttribute("mensagem", "Login já cadastrado!");
            return "redirect:/cadastrarUsuario";
        }

        // Salva o usuário no banco de dados
        usuarioRepository.save(usuario);
        attributes.addFlashAttribute("mensagem", "Usuário cadastrado com sucesso!");

        return "redirect:/listarUsuarios"; // Redirecionar para a lista de usuários
    }

    // Método para listar todos os usuários
    @GetMapping("/listarUsuarios")
    public String listarUsuarios(Model model) {
        List<Usuario> usuarios = usuarioRepository.findAll();
        model.addAttribute("usuarios", usuarios);
        return "Usuario/listarUsuarios"; // O caminho da sua página de listagem
    }
}

