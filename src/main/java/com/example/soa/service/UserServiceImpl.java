package com.example.soa.service;

import com.example.soa.model.User;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    // Demo implementation: no database is required.
    @Override
    public User getUserById(Long id) {
        if (id == 1L) return new User(1L, "Asha", "asha@example.com");
        return null;
    }

    @Override
    public List<User> getAllUsers() {
        return List.of(new User(1L, "Asha", "asha@example.com"),
                       new User(2L, "Ravi", "ravi@example.com"));
    }
}
