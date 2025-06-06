package com.example.ChatbotAPI.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())  // Garante que qualquer requisição seja autenticada
//                .httpBasic(withDefaults());  // Utiliza a autenticação básica recomendada
//
//        return http.build();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();  // Utiliza o BCryptPasswordEncoder para codificar senhas
//    }

    //@Configuration
    //@EnableWebSecurity
    //public class SecurityConfig extends WebSecurityConfigurerAdapter {
    //    @Override
    //    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    //        auth.inMemoryAuthentication()
    //            .withUser("admin")
    //            .password("{noop}password") // Para senhas sem codificação; use BCrypt em produção
    //            .roles("ADMIN");
    //    }
    //}


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Desativa a proteção CSRF
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/**").permitAll() // Permite acesso livre a todos os endpoints
                                .anyRequest().authenticated()  // Exige autenticação para qualquer outro endpoint
                );
        return http.build();
    }
}

