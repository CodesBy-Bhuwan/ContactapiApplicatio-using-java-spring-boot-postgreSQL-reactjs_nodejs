package io.getinfo.contactinfoapi.service;

import io.getinfo.contactinfoapi.domain.Contact;
import io.getinfo.contactinfoapi.repo.ContactRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class ContactService {
    private final ContactRepo contactRepo;
    public Page<Contact> getAllContacts(int page, int size){

        return contactRepo.findAll(PageRequest.of(page, size, Sort.by("name")));
    }
}
