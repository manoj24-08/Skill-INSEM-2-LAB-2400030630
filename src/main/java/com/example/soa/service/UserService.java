package com.example.soa.service;

import com.example.soa.model.User;
import java.util.List;

public interface UserService {
    User getUserById(Long id);
    List<User> getAllUsers();
}
