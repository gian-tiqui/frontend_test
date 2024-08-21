"use client";

import { useEffect, useState } from "react";
import Avatar from "boring-avatars";
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

import Controls from "./controls";
import Modal from "./modal";

import { User } from "./types/user";
import useFieldStore from "./store/useFieldStore";
import { useDirectionStore } from "./store/useDirectionStore";

export type GalleryProps = {
  users: User[];
};
const Gallery = ({ users }: GalleryProps) => {
  const [usersList, setUsersList] = useState<User[]>(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { field } = useFieldStore();
  const { direction } = useDirectionStore();

  useEffect(() => {
    const handleFieldChange = () => {
      if (field.value === "name") {
        setUsersList(
          [...usersList].sort((a, b) => {
            const comparison = a.name.localeCompare(b.name);
            return direction.value === "ascending" ? comparison : -comparison;
          })
        );
      } else if (field.value === "company") {
        setUsersList(
          [...usersList].sort((a, b) => {
            const comparison = a.company.name.localeCompare(b.company.name);
            return direction.value === "ascending" ? comparison : -comparison;
          })
        );
      } else {
        setUsersList(
          [...usersList].sort((a, b) => {
            const comparison = a.email.localeCompare(b.email);
            return direction.value === "ascending" ? comparison : -comparison;
          })
        );
      }
    };

    handleFieldChange();
  }, [field]);

  useEffect(() => {
    const handleDirectionChange = () => {
      if (field.value == "name") {
        if (direction.value == "ascending") {
          setUsersList(
            [...usersList].sort((a, b) => a.name.localeCompare(b.name))
          );
        } else {
          setUsersList(
            [...usersList].sort((a, b) => b.name.localeCompare(a.name))
          );
        }
      } else if (field.value == "company") {
        if (direction.value == "ascending") {
          setUsersList(
            [...usersList].sort((a, b) =>
              a.company.name.localeCompare(b.company.name)
            )
          );
        } else {
          setUsersList(
            [...usersList].sort((a, b) =>
              b.company.name.localeCompare(a.company.name)
            )
          );
        }
      } else if (field.value == "email") {
        if (direction.value == "ascending") {
          setUsersList(
            [...usersList].sort((a, b) => a.email.localeCompare(b.email))
          );
        } else {
          setUsersList(
            [...usersList].sort((a, b) => b.email.localeCompare(a.email))
          );
        }
      }
    };

    handleDirectionChange();
  }, [direction]);

  const handleModalOpen = (id: number) => {
    const user = usersList.find((item) => item.id === id) || null;

    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="user-gallery">
      <div className="heading">
        <h1 className="title">Users</h1>
        <Controls />
      </div>
      <div className="items">
        {usersList.map((user, index) => (
          <div
            className="item user-card"
            key={index}
            onClick={() => handleModalOpen(user.id)}
          >
            <div className="body">
              <Avatar
                size={96}
                name={user.name}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            <div className="info">
              <div className="name">{user.name}</div>
              <div className="company">{user.company.name}</div>
            </div>
          </div>
        ))}
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="user-panel">
            <div className="header">
              <div
                role="button"
                tabIndex={0}
                className="close"
                onClick={handleModalClose}
              >
                <FaRegCircleXmark size={32} />
              </div>
            </div>
            <div className="body">
              {selectedUser && (
                <div className="user-info info">
                  <div className="avatar">
                    <Avatar
                      size={240}
                      name={selectedUser.name}
                      variant="marble"
                      colors={[
                        "#92A1C6",
                        "#146A7C",
                        "#F0AB3D",
                        "#C271B4",
                        "#C20D90",
                      ]}
                    />
                  </div>
                  <div className="name">
                    {selectedUser.name} ({selectedUser.username})
                  </div>
                  <div className="field">
                    <FaLocationDot className="icon" />
                    <div className="data">{`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}`}</div>
                  </div>
                  <div className="field">
                    <FaPhone className="icon" />
                    <div className="value">{selectedUser.phone}</div>
                  </div>
                  <div className="field">
                    <FaEnvelope className="icon" />
                    <div className="value">{selectedUser.email}</div>
                  </div>
                  <div className="company">
                    <div className="name">{selectedUser.company.name}</div>
                    <div className="catchphrase">
                      {selectedUser.company.catchPhrase}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
