package LivroCRUD;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Livros {

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getObra() {
        return Obra;
    }

    public void setObra(String obra) {
        Obra = obra;
    }

    public String getCopyrigth() {
        return Copyrigth;
    }

    public void setCopyrigth(String copyrigth) {
        Copyrigth = copyrigth;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String autor;
    private String Obra;
    private String Copyrigth;
    private int id;

    public Livros(String autor, String obra, String copyrigth) {
        this.autor = autor;
        Obra = obra;
        Copyrigth = copyrigth;
    }


}
