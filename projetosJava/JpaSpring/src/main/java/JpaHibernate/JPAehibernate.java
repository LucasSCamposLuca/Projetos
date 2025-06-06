package JpaHibernate;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class JPAehibernate {
    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("exercicios-jpa");
        EntityManager em = emf.createEntityManager();
            Usuarios usuario  = new Usuarios("Doom", "DoomSlayer@senai.com.br");

            usuario.setId(1);

        em.getTransaction().begin();
        em.merge(usuario);
        em.getTransaction().commit();


            em.close();
            em.close();
    }
}
