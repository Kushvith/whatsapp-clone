package com.example.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.api.model.Chat;
import com.example.api.model.User;

public interface ChatRepository extends JpaRepository<Chat,Long>  {
    @Query("select c from Chat c join users u where u.id= :userId")
    public List<Chat> findChatByUserId(@Param("userId") Long userId);

    @Query("select c from Chat c where c.isGroup = false and :user member of c.users and :reqUser member of c.users")
    public Chat findSingleChatByUserId(@Param("user") User user, @Param("reqUser")User reqUser);
}
