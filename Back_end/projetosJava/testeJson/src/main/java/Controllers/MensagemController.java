package Controllers;

import Model.Mensagem;
import Repository.MensagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/java")
public class MensagemController {

    @Autowired
    private MensagemRepository mensagemRepository;

    @PostMapping("/mensagem")
    public ResponseEntity<String> salvarMensagem(@RequestBody Map<String, String> request) {
        String mensagem = request.get("mensagem");
        Mensagem novaMensagem = new Mensagem();
        novaMensagem.setMensagem(mensagem);
        mensagemRepository.save(novaMensagem);
        return ResponseEntity.ok("Mensagem salva: " + mensagem);
    }

    @GetMapping("/mensagem")
    public ResponseEntity<List<Mensagem>> buscarMensagens() {
        return ResponseEntity.ok(mensagemRepository.findAll());
    }
}

