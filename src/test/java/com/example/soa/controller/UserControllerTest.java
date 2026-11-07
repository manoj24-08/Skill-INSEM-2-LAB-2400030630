package com.example.soa.controller;

import com.example.soa.model.User;
import com.example.soa.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    // Supplies the controller dependency in this web-slice test.
    // The real service/database are not loaded.
    @MockBean
    private UserService userService;

    @Test
    void getUserById_returns200AndPayload() throws Exception {
        when(userService.getUserById(1L))
                .thenReturn(new User(1L, "Asha", "asha@example.com"));

        mockMvc.perform(get("/users/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Asha"))
                .andExpect(jsonPath("$.email").value("asha@example.com"));
    }

    @Test
    void getAllUsers_returns200AndPayload() throws Exception {
        when(userService.getAllUsers()).thenReturn(List.of(
                new User(1L, "Asha", "asha@example.com"),
                new User(2L, "Ravi", "ravi@example.com")));

        mockMvc.perform(get("/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Asha"))
                .andExpect(jsonPath("$[1].name").value("Ravi"));
    }
}
