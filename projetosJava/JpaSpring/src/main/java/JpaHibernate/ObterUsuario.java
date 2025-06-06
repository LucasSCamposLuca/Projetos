package JpaHibernate;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class ObterUsuario {
    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("exercicios-jpa");
        EntityManager em = emf.createEntityManager();

        Usuarios usuario = em.find(Usuarios.class, 1);

        System.out.println(usuario.getNome("Lucas"));

        em.close();
        emf.close();
    }
}
