package JpaHibernate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Usuarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nome;
    private String email;


    public Usuarios(){

    }

    public Usuarios(String nome, String email) {
        this.nome = nome;
        this.email = email;
    }

    public int getId() {return id;}

    public void setId(int id) {this.id = id;}

    public String getNome(String lucas) {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail(String email) {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}
