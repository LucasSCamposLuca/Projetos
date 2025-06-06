package LivroCRUD;

import JpaHibernate.Usuarios;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class Create {
    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("exercicios-jpa");
        EntityManager em = emf.createEntityManager();
        Livros livro = new Livros("Lucas", "A teoria da Verdade", "2025");

        livro.setId(1);

        em.getTransaction().begin();
        em.merge(livro);
        em.getTransaction().commit();

        em.close();
        emf.close();

    }
}
