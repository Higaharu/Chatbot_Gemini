import faiss
import pickle
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS

# 保存したデータをロード
index = faiss.read_index("faiss_index.index")
with open("docstore.pkl", "rb") as f:
    docstore = pickle.load(f)
with open("index_to_docstore_id.pkl", "rb") as f:
    index_to_docstore_id = pickle.load(f)

# HuggingFaceの埋め込みモデル
embedding = HuggingFaceEmbeddings(model_name="intfloat/multilingual-e5-large")

# FAISSインデックスを再構築
faiss_index = FAISS(
    embedding_function=embedding.embed_query,
    index=index,
    docstore=docstore,
    index_to_docstore_id=index_to_docstore_id
)

# クエリの検索
query = "アップルバナナについて教えてください。"
results = faiss_index.similarity_search(query, k=1)  # kを1に設定して1つのチャンクを取得

# 検索結果の表示
for result in results:
    print(result.page_content)  # チャンクの内容を表示
    print(f"Source: {result.metadata['source']}")  # チャンクの出所を表示
