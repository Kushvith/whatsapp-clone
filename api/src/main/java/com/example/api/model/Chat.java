
package com.example.api.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String chat_name;
    private String chat_image;
    @JoinColumn(name = "is_group")
    private boolean isGroup;
    @JoinColumn(name = "created_by")
    @ManyToOne
    private User createdBy;
    @ManyToMany
    private Set<User> admins = new HashSet<>();
    @ManyToMany
    private Set<User> users = new HashSet<>();

    @OneToMany
    private List<Message> messages = new ArrayList<>();

}
