// Enable strict mode for all collections
db.runCommand({ setFeatureCompatibilityVersion: "5.0" });

// Users Collection
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "username", "password", "phone", "role", "status"],
      properties: {
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        },
        username: {
          bsonType: "string",
          minLength: 3,
          maxLength: 50
        },
        password: {
          bsonType: "string",
          minLength: 8
        },
        phone: {
          bsonType: "string",
          pattern: "^\\+?[1-9]\\d{1,14}$"
        },
        whatsapp: {
          bsonType: "string",
          pattern: "^\\+?[1-9]\\d{1,14}$",
          description: "Optional WhatsApp number"
        },
        telegram: {
          bsonType: "string",
          description: "Optional Telegram username"
        },
        role: {
          enum: ["admin", "user"]
        },
        status: {
          enum: ["active", "suspended"]
        },
        createdAt: {
          bsonType: "date"
        },
        updatedAt: {
          bsonType: "date"
        }
      }
    }
  }
});

// Categories Collection
db.createCollection("categories", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "slug", "subcategories"],
      properties: {
        name: {
          bsonType: "string",
          minLength: 1
        },
        slug: {
          bsonType: "string",
          minLength: 1
        },
        subcategories: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["name"],
            properties: {
              name: {
                bsonType: "string",
                minLength: 1
              }
            }
          }
        },
        createdAt: {
          bsonType: "date"
        },
        updatedAt: {
          bsonType: "date"
        }
      }
    }
  }
});

// Listings Collection
db.createCollection("listings", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "userId",
        "domain",
        "description",
        "categories",
        "da",
        "dr",
        "traffic",
        "price",
        "requirements",
        "turnaround",
        "linkType",
        "status",
        "languages"
      ],
      properties: {
        userId: {
          bsonType: "objectId"
        },
        domain: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\\.[a-zA-Z]{2,}$"
        },
        description: {
          bsonType: "string",
          minLength: 50
        },
        categories: {
          bsonType: "array",
          minItems: 1,
          items: {
            bsonType: "string"
          }
        },
        da: {
          bsonType: "int",
          minimum: 0,
          maximum: 100
        },
        dr: {
          bsonType: "int",
          minimum: 0,
          maximum: 100
        },
        traffic: {
          bsonType: "string"
        },
        price: {
          bsonType: "number",
          minimum: 20
        },
        showPrice: {
          bsonType: "bool",
          default: true
        },
        requirements: {
          bsonType: "array",
          minItems: 1,
          items: {
            bsonType: "string"
          }
        },
        turnaround: {
          bsonType: "string"
        },
        linkType: {
          enum: ["dofollow", "nofollow", "both"]
        },
        status: {
          enum: ["pending", "active", "rejected"]
        },
        isPremium: {
          bsonType: "bool",
          default: false
        },
        languages: {
          bsonType: "array",
          minItems: 1,
          items: {
            bsonType: "string"
          }
        },
        createdAt: {
          bsonType: "date"
        },
        updatedAt: {
          bsonType: "date"
        }
      }
    }
  }
});

// Messages Collection
db.createCollection("messages", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["senderId", "receiverId", "subject", "content", "status"],
      properties: {
        senderId: {
          bsonType: "objectId"
        },
        receiverId: {
          bsonType: "objectId"
        },
        subject: {
          bsonType: "string",
          minLength: 1
        },
        content: {
          bsonType: "string",
          minLength: 1
        },
        status: {
          enum: ["unread", "read", "replied"]
        },
        replies: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["content", "date"],
            properties: {
              content: {
                bsonType: "string",
                minLength: 1
              },
              date: {
                bsonType: "date"
              }
            }
          }
        },
        createdAt: {
          bsonType: "date"
        }
      }
    }
  }
});

// Create indexes for better performance
// Users indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "phone": 1 }, { unique: true });
db.users.createIndex({ "status": 1 });
db.users.createIndex({ "role": 1 });

// Categories indexes
db.categories.createIndex({ "name": 1 }, { unique: true });
db.categories.createIndex({ "slug": 1 }, { unique: true });
db.categories.createIndex({ "subcategories.name": 1 });

// Listings indexes
db.listings.createIndex({ "userId": 1 });
db.listings.createIndex({ "domain": 1 }, { unique: true });
db.listings.createIndex({ "categories": 1 });
db.listings.createIndex({ "status": 1 });
db.listings.createIndex({ "da": 1 });
db.listings.createIndex({ "dr": 1 });
db.listings.createIndex({ "price": 1 });
db.listings.createIndex({ "isPremium": 1 });
db.listings.createIndex({ "languages": 1 });
db.listings.createIndex({ "createdAt": 1 });

// Messages indexes
db.messages.createIndex({ "senderId": 1 });
db.messages.createIndex({ "receiverId": 1 });
db.messages.createIndex({ "status": 1 });
db.messages.createIndex({ "createdAt": 1 });

// Create text indexes for search functionality
db.listings.createIndex({
  "domain": "text",
  "description": "text",
  "categories": "text"
});

db.categories.createIndex({
  "name": "text",
  "subcategories.name": "text"
});

// Create compound indexes for common queries
db.listings.createIndex({ "status": 1, "isPremium": 1 });
db.listings.createIndex({ "status": 1, "categories": 1 });
db.listings.createIndex({ "status": 1, "languages": 1 });
db.messages.createIndex({ "senderId": 1, "status": 1 });
db.messages.createIndex({ "receiverId": 1, "status": 1 });