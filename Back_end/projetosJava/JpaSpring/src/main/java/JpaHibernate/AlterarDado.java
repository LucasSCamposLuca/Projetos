package JpaHibernate;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class AlterarDado {
    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("exercicios-jpa");
        EntityManager em = emf.createEntityManager();

        em.getTransaction().begin();
        Usuarios usuario = em.find(Usuarios.class,1);
        usuario.getNome("Lucas");
        usuario.getEmail("Lucas@senai.br");

        em.merge(usuario);
        em.getTransaction().commit();

        em.close();
        emf.close();
    }
}
