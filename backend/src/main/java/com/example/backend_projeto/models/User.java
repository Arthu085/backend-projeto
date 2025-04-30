package com.example.backend_projeto.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@SequenceGenerator(name = "USERS_ID_SEQ", sequenceName = "users_id_seq", allocationSize = 1, schema = "public")
@Table(name = "users", schema = "public")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "USERS_ID_SEQ")
    private Long id;

    @Column(length = 50)
    private String name;

    @Column(length = 100, unique = true)
    private String email;

    @Column(length = 70)
    private String password;

    @Column(length = 70)
    private String city;
}
