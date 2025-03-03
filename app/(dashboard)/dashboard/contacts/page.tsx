"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatDistanceToNow } from "date-fns";
import { IconMail, IconCheck, IconRefresh, IconTrash, IconMailOpened, IconPhone, IconMapPin } from "@tabler/icons-react";
import { Id } from "@/convex/_generated/dataModel";

export default function ContactsPage() {
  const contacts = useQuery(api.contacts.list);
  const updateContactStatus = useMutation(api.contacts.updateStatus);
  const removeContact = useMutation(api.contacts.remove);
  const [expandedContact, setExpandedContact] = useState<Id<"contacts"> | null>(null);
  const [isDeleting, setIsDeleting] = useState<Id<"contacts"> | null>(null);
  
  const handleUpdateStatus = async (id: Id<"contacts">, status: string) => {
    await updateContactStatus({ id, status });
  };
  
  const handleDelete = async (id: Id<"contacts">) => {
    setIsDeleting(id);
    try {
      await removeContact({ id });
    } catch (error) {
      console.error("Failed to delete contact", error);
    } finally {
      setIsDeleting(null);
    }
  };
  
  if (!contacts) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="animate-spin h-8 w-8 border-2 border-blue-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "read":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "replied":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {contacts.length} {contacts.length === 1 ? "message" : "messages"}
        </div>
      </div>
      
      {contacts.length === 0 ? (
        <div className="bg-white dark:bg-neutral-900/30 rounded-xl border border-neutral-200 dark:border-neutral-800 p-8 text-center">
          <IconMail className="w-12 h-12 mx-auto mb-4 text-neutral-400 dark:text-neutral-600" />
          <h2 className="text-xl font-medium mb-2">No messages yet</h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
            When someone sends you a message through the contact form, it will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white dark:bg-neutral-900/30 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
            >
              <div 
                className="p-4 cursor-pointer flex items-start justify-between"
                onClick={() => {
                  setExpandedContact(expandedContact === contact._id ? null : contact._id);
                  if (contact.status === "new") {
                    handleUpdateStatus(contact._id, "read");
                  }
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <IconMail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{contact.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{contact.email}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {formatDistanceToNow(contact.createdAt)} ago
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isDeleting === contact._id ? (
                    <span className="h-5 w-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(contact._id);
                      }}
                      className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20"
                    >
                      <IconTrash className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              
              {expandedContact === contact._id && (
                <div className="p-4 pt-0 border-t border-gray-100 dark:border-neutral-800 mt-2">
                  <div className="bg-gray-50 dark:bg-neutral-800/50 rounded-lg p-4 whitespace-pre-wrap">
                    {contact.message}
                  </div>
                  
                  <div className="flex items-center justify-end space-x-2 mt-4">
                    <button
                      onClick={() => handleUpdateStatus(contact._id, "new")}
                      className="flex items-center space-x-1 px-2 py-1 rounded text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <IconRefresh className="h-3.5 w-3.5" />
                      <span>Mark as New</span>
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(contact._id, "read")}
                      className="flex items-center space-x-1 px-2 py-1 rounded text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                      <IconCheck className="h-3.5 w-3.5" />
                      <span>Mark as Read</span>
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(contact._id, "replied")}
                      className="flex items-center space-x-1 px-2 py-1 rounded text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    >
                      <IconMailOpened className="h-3.5 w-3.5" />
                      <span>Mark as Replied</span>
                    </button>
                    <a
                      href={`mailto:${contact.email}?subject=Re: Contact Form Submission&body=Hello ${contact.name},%0D%0A%0D%0AThank you for reaching out.%0D%0A%0D%0A`}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm"
                    >
                      <IconMail className="h-3.5 w-3.5" />
                      <span>Reply via Email</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 