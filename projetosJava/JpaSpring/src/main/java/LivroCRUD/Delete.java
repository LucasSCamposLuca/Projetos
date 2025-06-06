package LivroCRUD;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class Delete {
    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("exercicios-jpa");
        EntityManager em = emf.createEntityManager();

        Livros livro = em.find(Livros.class, 1);
        if (livro != null){
            em.getTransaction().begin();
            em.remove(livro);
            em.getTransaction().commit();
        }
        em.close();
        emf.close();
    }
}
