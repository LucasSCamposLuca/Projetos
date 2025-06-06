package LivroCRUD;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class Update {
    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("exercicio-jpa");
        EntityManager em = emf.createEntityManager();

        em.getTransaction().begin();
        Livros livro = em.find(Livros.class, 1);
        livro.setAutor("lucas");
        livro.setObra("Fobia Moral");
        livro.setCopyrigth("2026");
    }
}
